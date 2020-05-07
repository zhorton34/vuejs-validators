# Vuejs Validators

> Form Validation Simplified

### Table Of Contents
- [Install](#Installation)
- [Available Rules](#available-validation-rules)
- [Validator Life Cycle Hooks](#validator-life-cycle-hooks)
- [Validator Errors Api](#validator-error-api)

- [Extending](#extending)
- [Custom Messages](#extending)
- [Custom Validation Rules](#extending-custom-rules)

- [License](#license)
- [Contribute](#contribute)
- [Pull in VueJS Form, Super powerful, lightweight combo](#vuejs-form-alongside-vuejs-validators)

# Vuejs Form Alongside Vuejs Validators
> `Recommended for good vibes & simplified development`
- Created along side each other
- Each repository has zero non-dev dependencies
- Both completely separate form logic from the ui/representation of the data itself
- Separated repositories allow for using vuejs-form's and vuejs-validations independent of each other
[Recommended Vuejs Form Package](https://github.com/zhorton34/vuejs-form)

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
            validator: validator({}, {
                name: 'required|min:5',
                email: 'email|min:5|required',
                password: 'required|same:confirm_password',
                confirm_password: 'min:6',
            }),

            form: form({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }),
       }),

        methods: {
            before(validation) {
               validation.setData(this.form)
            },

            after(validation) {
                console.log('after: ', validation);
            },

            failed(validation) {
                console.log('failed validation, flash errors: ', validator.errors().all());
            },

            passed(validation) {
                /**
                 *   axios.post('/stuff', this.form.wrap('data'))
                 *        .then(response => console.log)
                 *        .catch(oops => console.error)
                 */
                console.log('passed, submit form data: ', this.form.all());
            },

            submit() {
                this.validator
                    .before(validation => this.before(validation))
                    .after(validation => this.after(validation)
                    .passed(validation => this.passed(validation))
                    .failed(validation => this.failed(validation))
            }
        }
    }
</script>
```
