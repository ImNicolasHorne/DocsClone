import { Editor } from "./editor"
interface DocumentIdPage {
    params: Promise<{ documentId: string}>
}

const documentIdPage = async ({params}: DocumentIdPage) => {
    const {documentId} = await params

    return ( 
        <div>
            Document ID: {documentId}
            <Editor />
        </div>
     );
}
 
export default documentIdPage;