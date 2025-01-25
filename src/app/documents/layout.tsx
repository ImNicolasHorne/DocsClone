interface documentsLayoutProps {
    children: React.ReactNode;
}

const documentsLayout = ({ children } : documentsLayoutProps) => {
    return ( 
         <div className="flex flex-col gap-y-4">
            <nav className="w-full bg-red-500">Document navbar</nav>
           {children}
         </div>
     );
}
 
export default documentsLayout
