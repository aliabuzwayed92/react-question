
export const field = ({value = '', name, isRequired = true, minLength = 0, pattern = ''}) => {
    const settings = {
      value,
      name,
      errors: [],
      validations: {}
    } 
  
    if(isRequired){
      settings.validations.isRequired = true;
    }
    if(minLength > 0){
      settings.validations.minLength  = minLength;
    }
    if(pattern) {
      settings.validations.pattern = pattern;
    }
  
    return settings;
  }
  
  export default (value, name, validations) => {
  
      let valid = true,
        errors = [];
  
        if (validations.isRequired && !value.trim()) {
          valid = false;
          errors.push(`${name} is required`);
        }
  
        if (validations.minLength && value.length < validations.minLength) {
          valid = false;
          errors.push(`${name} should be no less than ${validations.minLength} characters`);
        }
  
        if(validations.pattern && !validations.pattern.test(value)){
           valid = false;
           errors.push(`Invalid ${name}`);
       }
   
        return {valid, errors};
  }