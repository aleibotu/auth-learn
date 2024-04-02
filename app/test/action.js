'use server';

export const submitAction = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {msg: 'submit action'}
}

export const otherAction = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return {msg: 'other action'}
}
