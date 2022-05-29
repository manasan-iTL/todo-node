const { Pool } = require("pg")
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


/* クエリ文の定義 */

/* すべてのタスクを取得 */
const getAllTasks = `SELECT * FROM tasks`

/* 未完了のタスクを取得する */
const getUncompleteTask = `SELECT * FROM tasks WHERE complete_flag = False`

/* タスクを新規作成 */
const createTask = `INSERT INTO tasks(task, complete_flag) VALUES($1, $2)`

/* 完了フラグを更新する */
const changeFlag = `UPDATE tasks SET complete_flag = $1 WHERE id = $2`


module.exports = {
  pool: pool,
  getAllTasks: getAllTasks,
  getUncompleteTask: getUncompleteTask,
  createTask: createTask,
  changeFlag: changeFlag
}