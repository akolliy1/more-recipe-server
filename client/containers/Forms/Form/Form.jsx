import React from 'react';
import Input from '../../../components/UI/Input/Input';
import Aux from '../../../hoc/Auxs/Auxs';
import FormHeader from '../../../components/UI/Input/FormH';
import BtnContainer from '../../../components/UI/Social/Container';
import CButton from '../../../components/UI/CButton/CButton';

/**
 * @description Form
 * @function Form
 * @param {*} props
 * @returns {JSX} jsx
 */
const Form = (props) => {
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
    >
      {
          formElementsArray.map(el => (
            <Input
              hasIcon
              key={el.id}
              label={el.id}
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
      <CButton>{props.children}</CButton>
    </FormHeader>
  );
  return (
    <Aux>
      { form }
    </Aux>
  );
};

export default Form;
