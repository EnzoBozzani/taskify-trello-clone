'use client';

import { Plus } from 'lucide-react';
import { ListWrapper } from './ListWrapper';

export const ListForm = () => {
	return (
		<ListWrapper>
			<button className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'>
				<Plus className='w-4 h-4 mr-2' />
				Add a list
			</button>
		</ListWrapper>
	);
};
