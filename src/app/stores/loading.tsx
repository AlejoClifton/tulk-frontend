export default function StoresPageLoading() {
    return (
        <div className="min-h-screen bg-white">
            <div className="animate-pulse">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-4 h-8 w-1/3 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="rounded-lg bg-white p-6 shadow-lg">
                                <div className="mb-4 h-48 rounded-lg bg-gray-200"></div>
                                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
                                <div className="mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full rounded bg-gray-200"></div>
                                    <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
