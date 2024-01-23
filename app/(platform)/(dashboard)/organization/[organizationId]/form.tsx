'use client';

import { create } from '@/actions/createBoard';
import { useFormState } from 'react-dom';
import { FormInput } from './FormInput';
import { FormButton } from './FormButton';

export const Form = () => {
	const initialState = { message: null, errors: [] };
	//@ts-ignore
	const [state, dispatch] = useFormState(create, initialState);

	return (
		<form action={dispatch}>
			<FormInput errors={state?.errors} />
			<FormButton />
		</form>
	);
};
