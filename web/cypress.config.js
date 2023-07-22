const { defineConfig } = require("cypress");

// IMPORTAÇÃO DA CLASSE POOL - POSTGRES
const { Pool } = require('pg')

// OBJETO DAS INFORMAÇÕES PARA CONEXÃO COM O BANCO
const dbConfig = {
  host: 'babar.db.elephantsql.com',
  user: 'qrucqdqk',
  password: 'haF3RmWvkhNavnI6TQ_6ADUmnZ3phWtv',
  database: 'qrucqdqk',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // IMPLEMENTAÇÃO DE UM OUVINTE
      // SEMPRE QUE INVOCADA UMA TASK, O CYPRESS VERIFICA SE ELA EXISTE
      on('task', {

        // FUNÇÃO PARA A DELEÇÃO DE UM ALUNO PELO EMAIL
        deleteStudent(studentEmail) {

          // CRIANDO UMA PROMESSA PARA O CYPRESS ENTENDER QUE:
          // SÓ PODE SEGUIR PARA O PRÓXIMO COMANDO QUANDO SE A FUNÇÃO FOR CUMPRIDA OU REJEITADA
          return new Promise(function (resolve, reject) {
            // APLICANDO A CONEXÃO COM O BANCO ATRAVÉS DE POOL + OBJETO COM OS DADOS
            const pool = new Pool(dbConfig)

            // QUERY SQL PARA A REMOÇÃO DO ALUNO PELO EMAIL INFORMADO
            const query = 'DELETE FROM students WHERE email = $1;'

            // EXECUTAMOS A QUERY PASSANDO O PARÂMeTRO EM UMA LISTA PARA SUBSTITUIR O $1 DA CONSTANTE
            pool.query(query, [studentEmail], function(error, result){
              // A FUNÇÃO DE CALLBACK VERIFICA O RESULTADO PARA IDENTIFICAR SE:

              if(error) {
                // OCORREU UM ERRO, DEVE REJEITAR A PROMESSA
                reject({error: error})                
              }
              // DEU TUDO CERTO, RESOLVE A PROMESSA
              resolve({success: result})

              // FECHA A CONEXÃO COM O BANCO
              pool.end()
            })
          })
        }

      })
    },
    env: {
      url: 'http://localhost:3000'
    },
    baseUrl: 'http://localhost:3000'
  },
});
