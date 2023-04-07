import Head from 'next/head';
import React from "react";
import Test from "@/components/common/DragDropTest";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export default function TestPage() {

    return(<>
        <Head><title>Test</title></Head>
        <DndProvider backend={HTML5Backend}>
            <Test />
        </DndProvider>
    </>);

}

