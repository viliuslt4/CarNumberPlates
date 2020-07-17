import { FormGroup } from "@angular/forms";
import { NgIf } from "@angular/common";

export class ValidationService{
    static checkIfSame(oldPlate){
        return (formGroup: FormGroup) => {
            const ownerName = formGroup.controls['owner'];
            const ownerPlate = formGroup.controls['plateNumber'];
            const isSame = formGroup.controls['isSame'];

            if (oldPlate.name === ownerName.value && oldPlate.plateNumber === ownerPlate.value) {
                isSame.setErrors({ match: true });
            } else {
                isSame.setErrors(null);
            }
        }
    }
    static onlyLetters(control){
        const regexName = /[a-zA-Z]+/g;
        if(control.value.match(regexName)){
            return null;
        }else{
            return { invalidLetters: true };
        }
    }
    static plateNumberMatch(control){
        const regexPlate = /^[a-zA-Z]{3}-{1}?\d{3}$/i;
        if(control.value.match(regexPlate)){
            return null;
        }else{
            return { invalidPlate: true };
        }
    }
}
