import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useQuery } from 'react-query';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/dist/client/link';

const IndividualBoard = () => {
  const id = useRouter().query.id as string;

  const { status, error, data } = useQuery(['board', { id }], () =>
    id ? fetch(`/api/board/${id}`).then((res) => res.json()) : null
  );

  if (status !== 'success') {
    return <p>Loading...</p>;
  }

  if (error) return <p> An error has occurred: {error.message}</p>;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = data.board.lists.find(
      (list) => list.id === source.droppableId
    );
    const finish = data.board.lists.find(
      (list) => list.id === destination.droppableId
    );

    // change card position in the same list
    // if (start === finish) {
    //   const newTaskIds = Array.from(start.cards);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };

    //   const newBoard = {
    //     ...data.board,
    //     columns: {
    //       ...data.board.lists,
    //       [newColumn.id]: newColumn,
    //     },
    //   };

    //   // setState
    //   return;
    // }

    // // Moving from one list to another
    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };

    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };

    // const newBoard = {
    //   ...data.board,
    //   columns: {
    //     ...data.board.lists,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
  };
  console.log(data);
  return (
    <div className="max-w-screen-2xl px-28 pt-16 mx-auto">
      {data && (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <div className="flex space-x-2 items-center">
            <h1 className="text-3xl font-medium">{data.board.title}</h1>
            <Link href={`/board/${id}/settings`}>
              <a>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </Link>
          </div>
          <h2 className="mb-10">{data.board.description}</h2>
          {data.board.lists.length === 0 ? (
            <h1>Start by creating a new list</h1>
          ) : null}
          <Droppable
            droppableId={data.board.id}
            type="LIST"
            direction="horizontal"
          >
            {(provided) => (
              <div
                className="flex"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.board.lists.map((list) => (
                  <Draggable
                    key={list.id}
                    draggableId={list.id}
                    index={list.index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative flex flex-col mr-3"
                      >
                        <div className="h-auto  p-5 rounded-lg shadow-lg bg-gray-50 mr-5 max-w-xl min-w-[275px]">
                          <h1 className="font-medium mb-3">{list.title}</h1>
                          <Droppable droppableId={list.id} type="CARD">
                            {(provided) => (
                              <div ref={provided.innerRef}>
                                {list.cards.map((card) => {
                                  return (
                                    <Draggable
                                      key={card.id}
                                      draggableId={card.id}
                                      index={card.index}
                                    >
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className="shadow bg-gray-200 p-5 rounded mb-2"
                                        >
                                          <div className="text-lg">
                                            <p>{card.content}</p>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default IndividualBoard;
