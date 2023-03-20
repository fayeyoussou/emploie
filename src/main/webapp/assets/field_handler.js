export class FieldHandler {
    setFormValues(formValue) {
        let form = document.getElementById('form-field');
        const inputs = form.querySelectorAll('input');
        for (const key in formValue) {
            const value = formValue[key];
            const input = Array.from(inputs).find(input => input.name === key);
            if (input) {
                input.value = value;
            }
        }
    }
}