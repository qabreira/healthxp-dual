require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
})

const deleteAndCreateStudent = (req, res) => {

    const student = req.body
    const queryDelete = `
        DELETE FROM students WHERE email = $1;
    `
    const queryInsert = `
        INSERT INTO students (name, email, age, weight, feet_tall)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING ID as student_id;
    `

    const values = [
        student.name, student.email, student.age, student.weight, student.feet_tall
    ]

    pool.query(queryDelete, [student.email], function (error, result) {
        if (error) {
            return res.status(500).json(error)
        }
        pool.query(queryInsert, values, function (error, result) {
            if (error) {
                return res.status(500).json(error)
            }
            res.status(201).json({ student_id: result.rows[0].student_id })
        })
    })
}

const deleteStudentByEmail = (req, res) => {
    const studentEmail = req.params.email
    const query = 'DELETE FROM students WHERE email = $1;'

    pool.query(query, [studentEmail], function (error, result) {
        if (error) {
            return res.status(500).json(error)
        }
        res.status(204).json()
    })
}

const insertEnrollByEmail = (req, res) => {
    const { email, plan_id, price } = req.body
    const query = `
        INSERT INTO enrollments (enrollment_code, student_id, plan_id, credit_card, status, price)
        SELECT
        'xpto123' as enrollment_code,
        id as student_id,
        $2 as plan_id,
        '4242' as credit_card,
        true as status,
        $3 as price
        FROM students
        WHERE email = $1;
    `
    const values = [email, plan_id, price]

    pool.query(query, values, function (error, result) {
        if (error) {
            return res.status(500).json(error)
        }
        res.status(201).end()
    })
}

const deleteAllHelpOrders = (req, res) => {
    const query = 'DELETE FROM "help_orders"'

    pool.query(query, function (error, result) {
        if (error) {
            return res.status(500).json(error)
        }
        res.status(204).end()
    })
}

module.exports = {
    deleteAndCreateStudent,
    deleteStudentByEmail,
    insertEnrollByEmail,
    deleteAllHelpOrders
}