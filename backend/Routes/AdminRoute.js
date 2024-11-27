import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.json({ Status: true, Result: result });
    });
});


router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.get('/permission', (req, res) => {
    const sql = "SELECT * FROM permission";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.json({ Status: true, Result: result });
    });
});
router.post('/add_permission', (req, res) => {
    const sql = "INSERT INTO permission (`name`) VALUES (?)";
    con.query(sql, [req.body.permission], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: " + err.message });
        return res.json({ Status: true });
    });
});


// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name, email, password, address, salary, image, category_id, permission_id) 
    VALUES (?)`;
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.error("Hashing Error:", err);
            return res.json({ Status: false, Error: "Hashing Error: " + err.message });
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id,
            req.body.permission_id // Include permission_id here
        ];

        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Database Query Error:", err);
                return res.json({ Status: false, Error: "Query Error: " + err.message });
            }
            return res.json({ Status: true, Result: result });
        });
    });
});


// router.get('/employee', (req, res) => {
//     const sql = "SELECT * FROM employee";
//     con.query(sql, (err, result) => {
//         if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status: true, Result: result})
//     })
// })
router.get('/employee', (req, res) => {
    const sql = `
    SELECT 
        employee.id, 
        employee.name, 
        employee.email, 
        employee.address, 
        employee.image, 
        category.name AS category_name,
        permission.name AS permission_name
    FROM employee 
    LEFT JOIN category ON employee.category_id = category.id
    LEFT JOIN permission ON employee.permission_id = permission.id
`;

    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err.message });
        }
        return res.json({ Status: true, Result: result });
    });
});


router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})




router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        SET name = ?, email = ?, salary = ?, address = ?, category_id = ?, permission_id = ? 
        WHERE id = ?`;
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        req.body.permission_id // Include permission_id here
    ];
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error: " + err.message });
        return res.json({ Status: true, Result: result });
    });
});


router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
