/**
  * Show Error
  */

export default function (dispatch, type, val) {
  return new Promise((resolve, reject) => {
    // Validate types
    const allowed = ['error', 'success', 'info', 'loading'];
    if (!allowed.includes(type)) {
      return reject('Tipo debe ser uno de éxito, error o información');
    }

    // Set some defaults for convenience
    let message = val;
    if (!val) {
      if (type === 'success') message = 'Éxito';
      if (type === 'error') message = 'Disculpe, ocurrió un error';
      if (type === 'info') message = 'Algo esta pasando...';
      if (type === 'loading' && val !== false) message = true;
    }

    return resolve(dispatch({
      type: 'STATUS_REPLACE',
      [type]: message,
    }));
  });
}
