import { deleteBoard } from '@/actions/deleteBoard';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';

import { Form } from './form';

const OrganizationIdPage = async () => {
	const boards = await db.board.findMany();

	return (
		<div className='flex flex-col space-y-4'>
			<Form />
			<div className='space-y-2'>
				{boards.map((board) => {
					const deleteBoardWithId = deleteBoard.bind(null, board.id);
					return (
						<form
							action={deleteBoardWithId}
							className='flex items-center gap-x-2'
							key={board.id}
						>
							<p>Board title: {board.title}</p>
							<Button
								variant={'destructive'}
								size={'sm'}
								type='submit'
							>
								Delete
							</Button>
						</form>
					);
				})}
			</div>
		</div>
	);
};

export default OrganizationIdPage;
