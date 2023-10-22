class Field {
    constructor(name, frontName, regexps, errorMsg, inputType, isValid, isRequired) {
        this.name = name
        this.frontName = frontName
        this.regexps = regexps
        this.errorMsg = errorMsg
        this.inputType = inputType
        this.isValid = isValid
        this.isRequired = isRequired
    }
}

const formFields = {
    userFields : {
        lastName : new Field('lastName', 'Last Name', ["^[A-Za-z- ]*$", "^[A-Za-z0-9]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        firstName : new Field('firstName', 'First Name', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        address : new Field('address', 'Address', ["^[A-Za-z0-9- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace, numbers and character -", "Maximum 255 characters"], "text", false, true),
        city : new Field('city', 'City', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        country : new Field('country', 'Country', ["^[A-Za-z- ]*$", "^[A-Za-z0-9-/ .%]{1,255}$"], ["Only letters, whitespace and character -", "Maximum 255 characters"], "text", false, true),
        birth : new Field('birth', 'Birth', ["^(19[0-9]{2}|20[0-9]{2})[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$"], ["Birth should be following this pattern : YYYY-MM-DD, with - separation"], "text", false, true),
        phone : new Field('phone', 'Phone', ["^[0-9 ]+$"], ["Phone accepts only numbers"], "text", false, true),
        email : new Field('email', 'Email', ["^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,8}$"], ["Please enter a valid email address"], "text", false, true),
        password : new Field('password', 'Password', ["^[A-Za-z]*$", "^[A-Za-z0-9]{1,40}$"], ["Only letters, no whitespace, no special character", "Maximum 40 characters"], "text", false, true),
    }
}


module.exports = formFields