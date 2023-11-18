const admin = require('firebase-admin')
const serviceAccount = require('./admin_config.json')

const new_admin = admin.initializeApp({ 
    credential : admin.credential.cert(serviceAccount)
})

const db = new_admin.firestore()

module.exports = { 
    admin : new_admin,
    db : db 
}
