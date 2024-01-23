'use client';

import { createBoard } from '@/actions/createBoard';
import { FormInput } from './FormInput';
import { FormButton } from './FormButton';
import { useAction } from '@/hooks/useAction';

export const Form = () => {
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			console.log(data, 'SUCCESS');
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string;

		execute({ title });
	};

	return (
		<form action={onSubmit}>
			<FormInput errors={fieldErrors} />
			<FormButton />
		</form>
	);
};