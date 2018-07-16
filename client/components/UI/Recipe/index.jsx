import React from 'react';
import Form from '../Input/Input';
import Aux from '../../../hoc/Auxs/Auxs';
/**
 * @description index
 * @function index
 * @param {*} props
 * @returns {JSX} jsx
 */
const index = (props) => {
  const formElementsArray = [];
  /* eslint-disable */
  for (const key in props.userForm) {
    formElementsArray.push({
      id: key,
      config: props.userForm[key]
    });
  }

  const recipe = (
    <Aux>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css" />
      {
          formElementsArray.map((el) => {
              let form;
              if (window.innerWidth > 930) {
                  if (!props.isClicked) {
                      if (el.id === 'ingredients') {
                          form = (<Form
                            key={el.id}
                            label={el.id}
                            important={false}
                            attributeType={el.config.type}
                            attributeConfig={el.config.elementConfig}
                            icon={el.config.icon}
                            clicked={props.clicked}
                            success={el.config.isSuccess}
                            feedback={!props.userForm[el.id].validation.isValid ? el.config.validation.InvalidMsg : null}
                            changed={event => props.changed(event, el.id)}
                          />);
                      }
                  } else {
                      form = (<Form
                        key={el.id}
                        label={el.id}
                        important={false}
                        attributeType={el.config.type}
                        attributeConfig={el.config.elementConfig}
                        icon={el.config.icon}
                        success={el.config.isSuccess}
                        feedback={!props.userForm[el.id].validation.isValid ? el.config.validation.InvalidMsg : null}
                        changed={event => props.changed(event, el.id)}
                      />);
                  }
              } else {
                  form = (<Form
                    key={el.id}
                    label={el.id}
                    important={el.config.important}
                    attributeType={el.config.type}
                    attributeConfig={el.config.elementConfig}
                    icon={el.config.icon}
                    success={el.config.isSuccess}
                    feedback={!props.userForm[el.id].validation.isValid ? el.config.validation.InvalidMsg : null}
                    changed={event => props.changed(event, el.id)}
                  />);
              }
              return form;
          })
        }
    </Aux>
  );
  return (
    <Aux>
      { recipe }
    </Aux>
  );
};

export default index;
