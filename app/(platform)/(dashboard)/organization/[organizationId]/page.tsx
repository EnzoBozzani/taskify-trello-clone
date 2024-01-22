import { create } from '@/actions/createBoard';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';

const OrganizationIdPage = async () => {
	const boards = await db.board.findMany();

	return (
		<div>
			<form action={create}>
				<input
					id='title'
					name='title'
					required
					placeholder='Enter board title'
					className='border-black border p-1'
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</div>
	);
};

export default OrganizationIdPage;
