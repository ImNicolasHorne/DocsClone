"use server"

import { Editor } from "./editor"
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
    params: Promise<{ documentId: string}>
}

const documentIdPage = async ({params}: 
DocumentIdPageProps) => {
    const { documentId } = await params;
        return ( 
        <Room>
            <div className="min-h-screen bg-[#FAFBFD] flex flex-col ">
                <div className="flex flex-col px-4 gap-y-2  top-0 left-0 ring-0 z-10 bg-[#FAFBFD] print:hidden h-[80px] items-center justify-center w-screen">
                    <Navbar />
                    <Toolbar />
                </div>
                <div className="pt-[12px] print:pt-0">       
                        <Editor />
                </div>
            </div>
        </Room>
        );

        return documentId


    
}
 
export default documentIdPage;