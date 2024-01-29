'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { ListWithCards } from '@/types';

import { ListForm } from './ListForm';
import { ListItem } from './ListItem';

interface ListContainerProps {
	data: ListWithCards[];
	boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data);

	useEffect(() => {
		setOrderedData(data);
	}, [data]);

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result;

		if (!destination) return;

		//if dropped in the same position
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		// user moves a list
		if (type === 'list') {
			const items = reorder(orderedData, source.index, destination.index).map((item, index) => ({
				...item,
				order: index,
			}));
			setOrderedData(items);
			//TODO: Trigger server action
		}

		// user moves card
		if (type === 'card') {
			let newOrderedData = [...orderedData];

			//Source and destination list
			const sourceList = newOrderedData.find((list) => list.id === source.droppableId);
			const destinationList = newOrderedData.find((list) => list.id === destination.droppableId);

			if (!sourceList || !destinationList) return;

			// Check if cards exists on the sourceList
			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			// Check if cards exists on the destinationList
			if (!destinationList.cards) {
				destinationList.cards = [];
			}

			// Moving the card into the same list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

				reorderedCards.forEach((card, index) => {
					card.order = index;
				});

				sourceList.cards = reorderedCards;

				setOrderedData(newOrderedData);
				//TODO: Trigger server action
			}
			//Moving the card to another list
			else {
				//Remove card from the source list
				const [movedCard] = sourceList.cards.splice(source.index, 1);
				//Assign the new listId to the moved card
				movedCard.listId = destination.droppableId;
				// Add card to the destination list
				destinationList.cards.splice(destination.index, 0, movedCard);

				//Update orders
				sourceList.cards.forEach((card, index) => {
					card.order = index;
				});

				destinationList.cards.forEach((card, index) => {
					card.order = index;
				});

				setOrderedData(newOrderedData);
				//TODO: Trigger server action
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId='lists'
				type='list'
				direction='horizontal'
			>
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='flex gap-x-3 h-full'
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									key={list.id}
									index={index}
									data={list}
								/>
							);
						})}
						{provided.placeholder}
						<ListForm />
						<div className='flex-shrink-0 w-1' />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	);
};
