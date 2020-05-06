# Vuejs Validators

> Form Validation Simplified

### Table Of Contents
- [Install](#Installation)
- [Available Validation Rules](#available-validation-rules)
- [Error Messages Api](#error-messages-api)
- [Life Cycle Hooks](#life-cycle-hooks)
- [Add Custom Rules](#extending)
- [Extending](#extending)
- [Custom Rules](#)
- [License](#license)
- [Contribute](#contribute)
- [Vuejs Form And Vuejs Validators](#vuejs-form-alongside-vuejs-validators)

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
            validator: validator(),

            form: form({
                name: '',
                email: '',
                password: '',
                confirm_password: ''
            }),
       }),

        created() {
            this.validator.make(this.form, {
                name: 'required|min:5',
                email: 'email|min:5|required',
                password: 'required|same:confirm_password',
                confirm_password: 'min:6',
          });
        },

        methods: {
            failed(validator) {
                console.log('validator errors: ', validator.errors().all())
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
