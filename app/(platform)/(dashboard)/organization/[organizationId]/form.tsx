'use client';

import { createBoard } from '@/actions/createBoard';
import { FormInput } from '@/components/form/FormInput';
import { useAction } from '@/hooks/useAction';

import { FormSubmit } from '@/components/form/FormSubmit';

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
			<FormInput
				label='Board title:'
				id='title'
				errors={fieldErrors}
			/>
			<FormSubmit>Save</FormSubmit>
		</form>
	);
};
