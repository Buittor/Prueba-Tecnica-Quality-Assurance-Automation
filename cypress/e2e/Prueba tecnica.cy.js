import userSelectors from "../pages/userSelectors"

describe('Registro de Usuario', () => {
  var selector = userSelectors ()
  
  it('El formulario debe permitir registrar un usuario con nombre, email y una contraseña', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    cy.get(selector.data.fullname).type(selector.userInfo.fullname)
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).type(selector.userInfo.password)
    cy.get(selector.data.signup).should('not.be.disabled').and('be.visible').click()
    cy.contains('Successful registration').should('be.visible')
  })
  it('El campo de nombre debe contener mínimo 2 palabras.', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    cy.get(selector.data.fullname).type('Pedro')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).type(selector.userInfo.password)
    cy.get(selector.data.signup).should('be.disabled') 
    cy.get(selector.data.fullname).clear().type(selector.userInfo.fullname)
    cy.get(selector.data.signup).should('not.be.disabled').and('be.visible').click()
  })
  it('El email debe cumplir con el estándar de una dirección de correo electrónico y ser único en la base de datos.', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    cy.get(selector.data.fullname).type(selector.userInfo.fullname)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).type(selector.userInfo.password)
    cy.get(selector.data.email).clear().type(selector.emails.invalidEmail) 
    cy.get(selector.data.email).should('have.value', selector.emails.invalidEmail)
    cy.get(selector.data.signup).should('be.disabled')
    cy.get(selector.data.email).clear().type(selector.emails.validEmail)
    cy.get(selector.data.email).should('have.value', selector.emails.validEmail)
    cy.get(selector.data.signup).should('not.be.disabled')
    cy.get(selector.data.email).clear().type(selector.emails.duplicateEmail)
    cy.get(selector.data.email).should('have.value', selector.emails.duplicateEmail)
    cy.get(selector.data.signup).should('be.disabled')
  });
  it('La contraseña debe cumplir con los requisitos: 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
  
    // Contraseña con menos de 8 caracteres
    cy.get(selector.data.fullname).type(selector.userInfo.fullname)
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.passwords.passwordshort)
    cy.get(selector.data.passwordconfirm).type(selector.passwords.passwordshort)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
    //cy.contains('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.').should('be.visible')
  
    // Contraseña sin mayúsculas
    cy.get(selector.data.password).clear().type(selector.passwords.passwordwithoutcapitalletters)
    cy.get(selector.data.passwordconfirm).clear().type(selector.passwords.passwordwithoutcapitalletters)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
    //cy.contains('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.').should('be.visible')
  
    // Contraseña sin minúsculas
    cy.get(selector.data.password).clear().type(selector.passwords.passwordwithoutlowercaseletters)
    cy.get(selector.data.passwordconfirm).clear().type(selector.passwords.passwordwithoutlowercaseletters)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
    //cy.contains('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.').should('be.visible')
  
    // Contraseña sin números
    cy.get(selector.data.password).clear().type(selector.passwords.passwordwithoutnumbers)
    cy.get(selector.data.passwordconfirm).clear().type(selector.passwords.passwordwithoutnumbers)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
    //cy.contains('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.').should('be.visible')
  
    // Contraseña sin caracteres especiales
    cy.get(selector.data.password).clear().type(selector.passwords.passwordwithoutspecialcharacters)
    cy.get(selector.data.passwordconfirm).clear().type(selector.passwords.passwordwithoutspecialcharacters)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
    //cy.contains('La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.').should('be.visible')
  
    // Contraseña válida
    cy.get(selector.data.password).clear().type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).clear().type(selector.userInfo.password)
    cy.get(selector.data.signup).should('not.be.disabled').and('be.visible').click()
  })
  it('El formulario no debe ser enviado hasta que todos los campos obligatorios estén completos y sean válidos.', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    cy.get(selector.data.signup).should('be.disabled')
  
    // Campo de nombre y verificar que el botón siga deshabilitado
    cy.get(selector.data.fullname).type(selector.userInfo.fullname)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
  
    // Campo de email y verificar que el botón siga deshabilitado
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
  
    // Campo de contraseña y verificar que el botón siga deshabilitado
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible')
  
    // Campo de confirmación de contraseña y verificar que el botón se habilite
    cy.get(selector.data.passwordconfirm).type(selector.userInfo.password)
    cy.get(selector.data.signup).should('not.be.disabled').and('be.visible')
  
    cy.get(selector.data.fullname).clear().type(selector.userInfo.fullname)
    cy.get(selector.data.email).clear().type(selector.userInfo.email)
    cy.get(selector.data.password).clear().type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).clear().type(selector.userInfo.password)
    cy.get(selector.data.signup).should('not.be.disabled').click()
  })
  it('La contraseña debe ser ingresada dos veces y el sistema debe informar al usuario si ambas coinciden. ', () => {
    cy.visit('https://test-qa.inlaze.com/auth/sign-up')
    cy.get(selector.data.fullname).type(selector.userInfo.fullname)
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.passwordconfirm).type(selector.passwords.passwordshort)
    cy.get(selector.data.signup).should('be.disabled').and('be.visible').click({force: true})
    cy.contains('Passwords do not match').should('be.visible')  
  })
})
describe('Login de Usuario', () => {
  var selector = userSelectors()

  it('El usuario debe poder loguearse con el email y la contraseña registrados.', () => {
    cy.visit('https://test-qa.inlaze.com/')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.signin).click()
  });
  it('El formulario de login no debe ser enviado hasta que todos los campos estén diligenciados.', () => {
    cy.visit('https://test-qa.inlaze.com/')
    cy.get(selector.data.signin).should('be.disabled')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.signin).should('be.disabled')
    cy.get(selector.data.email).clear()
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.signin).should('be.disabled')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.signin).should('not.be.disabled').click()
  });
  it('Al ingresar a la plataforma, debe mostrarse el nombre del usuario.', () => {
    cy.visit('https://test-qa.inlaze.com/')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.signin).click()
    cy.contains(selector.userInfo.fullname).should('be.visible')
  });
  it('La plataforma debe permitir al usuario cerrar la sesión.', () => {
    cy.visit('https://test-qa.inlaze.com/')
    cy.get(selector.data.email).type(selector.userInfo.email)
    cy.get(selector.data.password).type(selector.userInfo.password)
    cy.get(selector.data.signin).click()
    cy.get(selector.data.profilepicture).click()
    cy.get(selector.data.logout).click() 
    cy.url().should('include', '/test-qa.inlaze.com/')
  })
})
