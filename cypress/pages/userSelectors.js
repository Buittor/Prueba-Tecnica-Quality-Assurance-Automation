module.exports = function () {

    var data = {
        fullname: '#full-name',
        email: '#email',
        password: '#password',
        passwordconfirm: '#confirm-password',
        signup: 'button[type="submit"]',
        signin: 'button[type="submit"]',
        logout: 'body > app-root > app-panel-root > app-navbar > div > div.flex-none > div > ul > li:nth-child(3) > a',
        profilepicture: 'body > app-root > app-panel-root > app-navbar > div > div.flex-none > div > div > label > div > img'
    }
    var userInfo = {
        fullname: 'Pedro Pruebas',
        email: 'pedropruebas@mail.com',
        password:'Password123*'
    }
    var passwords ={
        passwordshort: 'Pass1!',
        passwordwithoutcapitalletters: 'password123*',
        passwordwithoutlowercaseletters: 'PASSWORD123*',
        passwordwithoutnumbers: 'Password*',
        passwordwithoutspecialcharacters: 'Password123'
    }
    var emails ={
        validEmail: 'user@dominio.com',
        invalidEmail: 'user.com',
        duplicateEmail: 'existente@dominio.com'
    }
    return {data, userInfo, passwords,emails}
}