import { Editor } from "./editor"
interface DocumentIdPage {
    params: Promise<{ documentId: string}>
}

const documentIdPage = async ({params}: DocumentIdPage) => {
    const {documentId} = await params

    return ( 
        <div className="min-h-screen bg-[#FAFBFD]">
            <Editor />
        </div>
     );
}
 
export default documentIdPage;