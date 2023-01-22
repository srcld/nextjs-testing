const params = {
    user: '',
    pass: ''
};
const loginTest = ({user, pass}) => {
    const results = [];
    results.push('EXT found')
    const components = window.Ext.ComponentQuery.query('bpcLogin')
    if (components.length) {

        results.push('LOGIN cmp found')
        const usernameField = components[0].down('field[name=username]')
        const passwordField = components[0].down('field[name=password]')
        if (usernameField && passwordField) {
            results.push('Fields found');
            usernameField.setValue(user);
            passwordField.setValue(pass);

            window.Ext.ComponentQuery.query('authdialog')[0].down('button[hidden=false]').click()
        } else {
            results.push('Fields not found');
        }
    }
    return results;
}

const getTest = function () {
    return {
        test: loginTest,
        params: params
    }
}

module.exports = {getTest};