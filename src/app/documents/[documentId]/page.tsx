interface DocumentIdPage {
    params: Promise<{ documentId: string}>
}

const documentIdPage = async ({params}: DocumentIdPage) => {
    const {documentId} = await params

    return ( 
        <div>
            Document ID: {documentId}
        </div>
     );
}
 
export default documentIdPage;