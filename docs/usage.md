# Usage

### Vue JS Example Usage

```bash

<template>
</template>

<script>
    import validator from 'vuejs-validators';

    export default {
        data() {
            form: { name: '', email: '', password: '', confirm_password: '' },



#************************
#* Create The Validator **
#***************************
#*  validator (
#*      data = {}, // data being validated
#*      rules = {}, // rules used on data being validated
#*      ?messages = {} // optional customized messages for rules used on data being validated
#* )
#*****************************

            validate: validator(

## Data (1st Arg)
#**********************************
#**** Validation Data ****************
#**********************************

                   this.form,


## Rules (2nd Arg)
#************************************
#**** Validation Rules *****************
#*************************************
# _Pipe Syntax  vs.  Array Syntax_
# "email|min:4"  ['email', 'min:4']
#**************************************

                   {
                       'name': 'required|string|min:4|uppercase', // Defined rules using pipes
                       'email': ['email', 'string', 'min:4'], // ---> or define rules using array
                       'password': ['required', 'string', 'min:8', 'same:confirm_password'],
                       'confirm_password': 'required|min:8',
                   },

## Custom Error Messages (3rd Arg)
#************************************
# (Optional)
# Override global rule message for rule on field
#*************************************************
# {
#  'field.rule': ':attribute failed given rule',
#  'field.ruleTwo': `:attribute failed another rule`,
#  'fieldTwo.rule': ':attribute failed some rule',
#  'fieldTwo.ruleTwo': ':attribute failed rule two',
#}
#******************************************************

                {
                    # Rule: "required"
                    # Field: "name"
                    'name.required': ':attribute is a required field',

                    # Rule: "email"
                    # Field: "email"
                    'name.email': ':attribute must be an email'
                }
            )
    },

    created() {
        // validator(input, rules, messages)

        this.validator = validator(this.form, this.form, this.form).extend({
                uppercase: [
                    // on failure this message will display
                    ':attribute field value must be uppercase thanks do this custom rule',
                    // method is used to determine if the value is successfully following the validation rule. False means it failed
                    ({ value }) => value.toUpperCase() === value
                ]
            });
    },
    methods: {
        passed(validator) {
            return axios.post('/login', validator.data).then(response => {
                this.$router.to('/home')
            });
        },
        failed(validator) {
            this
        },
        submit() {
            this.validator.passed(this.passed);
            this.validator.failed(this.failed);
            this.validator.prepare(this.beforeValidating);

            this.validator.validate();
        }
    }

}
</script>
```
