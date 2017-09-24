import * as formFunctions from '../formFunctions';

describe('validation functions', () => {
  it('validate Required', () => {
    const data = {
      name: null,
    };
    let errors = {};

    formFunctions.validateRequired(data, 'name', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.name = 'Marc';
    errors = {};

    formFunctions.validateRequired(data, 'name', errors);

    expect(Object.keys(errors).length).toBe(0);
  });

  it('validate Length', () => {
    const data = {
      name: null,
    };
    let errors = {};

    formFunctions.validateLength(0, 3, data, 'name', errors);

    expect(Object.keys(errors).length).toBe(0);

    data.name = 'Ma';
    errors = {};

    formFunctions.validateLength(2, 3, data, 'name', errors);

    expect(Object.keys(errors).length).toBe(0);

    formFunctions.validateLength(3, 5, data, 'name', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.name = 'Marc';
    errors = {};

    formFunctions.validateLength(1, 3, data, 'name', errors);

    expect(Object.keys(errors).length).toBe(1);

    expect(() => {
      formFunctions.validateLength(3, 1, data, 'name', errors);
    }).toThrow();
  });

  it('validate Email', () => {
    const data = {
      email: null,
    };
    let errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(0);

    data.email = 'Marc';
    errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.email = 'marc@';
    errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.email = 'marc@bla';
    errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.email = 'marc@bla.n';
    errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.email = 'marc@bla.nl';
    errors = {};

    formFunctions.validateEmail(data, 'email', errors);

    expect(Object.keys(errors).length).toBe(0);
  });

  it('validate Checked', () => {
    const data = {
      checked: null,
    };
    let errors = {};

    formFunctions.validateChecked(data, 'checked', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.checked = false;
    errors = {};

    formFunctions.validateRequired(data, 'checked', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.checked = true;
    errors = {};

    formFunctions.validateRequired(data, 'checked', errors);

    expect(Object.keys(errors).length).toBe(0);
  });

  it('validate Http', () => {
    const data = {
      url: null,
    };
    let errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(0);

    data.url = 'http';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.url = 'http:/';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.url = 'http://';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.url = 'http://bla';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.url = 'http://bla.';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(1);

    data.url = 'http://bla.nl';
    errors = {};

    formFunctions.validateHTTP(data, 'url', errors);

    expect(Object.keys(errors).length).toBe(0);
  });
});

describe('normalization functions', () => {
  it('normalize phone', () => {
    let data = '0000';

    let phone = formFunctions.normalizePhone(data);

    expect(phone).toBe('(00) 00');

    data = null;

    phone = formFunctions.normalizePhone(data);

    expect(phone).toBeNull();
  });

  it('normalize lowercase', () => {
    let data = 'ABC';

    let phone = formFunctions.normalizeLowercase(data);

    expect(phone).toBe('abc');

    data = 0;

    phone = formFunctions.normalizeLowercase(data);

    expect(phone).toBe(0);

    data = null;

    phone = formFunctions.normalizeLowercase(data);

    expect(phone).toBeNull();
  });
});
