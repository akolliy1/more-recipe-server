import React from 'react';
import Input from '../UI/Input/Input';
import FormHeader from '../UI/Input/FormH';
import BtnContainer from '../UI/Social/Container';
import CButton from '../UI/CButton/CButton';

/**
 * @description Form
 * @function Form
 * @param {*} props
 * @returns {JSX} jsx
 */
const Form = (props) => {
  // const userValue = { ...props.value };
  /* eslint-disable */
  const formElementsArray = [];
  for (const key in props.userForm) {
    formElementsArray.push({
      id: key,
      config: props.userForm[key]
    });
  }
  const form = (
    <FormHeader
      footerLink={props.link}
      footerAction={props.alt}
      footerStatus={props.status}
      resMsg={props.resMsg}
    >
      {
          formElementsArray.map(el => (
            <Input
              important
              hasIcon
              key={el.id}
              label={el.id}
              value={'' || el.config[el.id] }
              name={el.id}
              attributeType={el.config.type}
              attributeConfig={el.config.elementConfig}
              icon={el.config.icon}
              success={el.config.isSuccess}
              feedback={!el.config.validation.isValid ? el.config.validation.InvalidMsg : null}
              changed={event => props.changed(event, el.id)}
            />
          ))
        }
      <BtnContainer socialStatus={props.social} />
      <CButton clicked={props.clicked}>{props.children}</CButton>
    </FormHeader>
  );
  return form
};

export default Form;
