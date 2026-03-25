import React from "react";

const BlogSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 animate-pulse">
            <div className="aspect-[16/10] bg-slate-200" />
            <div className="p-6 space-y-4">
                <div className="h-6 bg-slate-200 rounded-full w-24" />
                <div className="space-y-2">
                    <div className="h-6 bg-slate-200 rounded-md w-full" />
                    <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                </div>
                <div className="h-4 bg-slate-200 rounded-md w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-5/6" />
                <div className="pt-4 flex items-center justify-between">
                    <div className="h-4 bg-slate-200 rounded-md w-20" />
                    <div className="h-4 bg-slate-200 rounded-md w-16" />
                </div>
            </div>
        </div>
    );
};

export default BlogSkeleton;
