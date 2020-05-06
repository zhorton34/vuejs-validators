# Vuejs Validators

> Form Validation Simplified

# Vuejs Validators

> Form Validation Simplified


# Use vuejs-validations Along Side vuejs-form
(Created in parrallel, but seperate repos keeps validation & form logic decoupled. Both repos have zero non-dev dependencies)

https://github.com/zhorton34/vuejs-form
```js
<template>
    <div>
        <input type='text' v-model='form.name' /> <br>
        <input type='email' v-model='form.email' /> <br>
        <input type='password' v-model='form.password' /> <br>
        <input type='password' v-model='form.confirm_password' /> <br>
        <hr>
        <button :disabled='form.empty()' @click='submit'>
            Complete
        </button>
    </div>
</template>

<script>
    import form from 'vuejs-form'
    import validator from 'vuejs-validators'

    export default {
       data: () => ({
            form: form({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }),

            validator: validator(form, {
                name: 'required|min:5',
                email: 'email|min:5|required',
                password: 'required|same:confirm_password',
                confirm_password: 'min:6',
            }),
       }),

        created() {
            this.validator.data = this.form.all();
        },

        methods: {
            failed(validator) {
                console.log('validator errors: ', validator.errors)
            },
            passed(validator) {
                console.log('passed: ', validator);
            },

            submit() {
                this.validator.passed(validator => this.passed(validator))
                this.validator.failed(validator => this.failed(validator))

                this.validator.validate();
            }
        }
    }
</script>
```
