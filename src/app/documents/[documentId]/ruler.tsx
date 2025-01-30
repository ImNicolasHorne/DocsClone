export const Ruler = () => {
    return(
        <div className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden">
            <div 
            id="ruler-container"
            className="max-w-[816px] mx-auto w-full h-full relative"></div>
        </div>
    );
};