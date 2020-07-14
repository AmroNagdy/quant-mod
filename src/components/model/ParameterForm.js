import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updateParameter } from 'redux/actions/ModelActions';
import SelectionParameter from 'model/parameter/SelectionParameter';
import NumericParameter from 'model/parameter/NumericParameter';
import NumericArrayParameter from 'model/parameter/NumericArrayParameter';

const ParameterForm = props => {

  const parameter = props.parameter;

  const getValue = parameter.value === null ? '' : parameter.value;

  const handleSelectionChange = event => {
    const newValue = event.target.value;
    props.updateParameter(parameter.name, newValue)
  };

  const handleNumericChange = event => {
    const newValue = event.target.value === '' ? null : Number(event.target.value);
    props.updateParameter(parameter.name, newValue);
  };

  const handleNumericArrayChange = event => {
    const newValue = event.target.value === '' ? [] : event.target.value.split(',').map(number => parseFloat(number));
    props.updateParameter(parameter.name, newValue);
  };

  const buildInputCell = parameter => {
    switch (parameter.constructor) {
      case SelectionParameter:
        return (
          <FormControl style={{ width: '280px' }} defaultValue={getValue} as='select' placeholder={parameter.description} onChange={handleSelectionChange}>
            {parameter.selections.map(selection => <option key={selection}>{selection}</option>)}
          </FormControl>
        );

      case NumericParameter:
        return (
          <FormControl style={{ width: '280px' }} defaultValue={getValue} placeholder={parameter.description} onChange={handleNumericChange} />
        );

      case NumericArrayParameter:
        return (
          <FormControl style={{ width: '280px' }} defaultValue={getValue} placeholder={parameter.description} onChange={handleNumericArrayChange} />
        );

      default:
        return;
    }
  }

  return (
    <InputGroup style={{ justifyContent: 'center' }}>
      <InputGroup.Prepend>
        <InputGroup.Text>{parameter.name}</InputGroup.Text>
        {buildInputCell(parameter)}
      </InputGroup.Prepend>
    </InputGroup>
  );

};

const mapDipatchToProps = dispatch => ({
  updateParameter: (parameterName, newValue) => dispatch(updateParameter(parameterName, newValue))
});

export default connect(null, mapDipatchToProps)(ParameterForm);