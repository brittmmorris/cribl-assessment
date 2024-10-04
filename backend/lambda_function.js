exports.handler = async (event) => {
    const now = new Date().toISOString();

    const fileStructure = [
        {
            type: 'folder',
            name: 'Files',
            modified: now,
            size: 0,
            children: [
                {
                    type: 'folder',
                    name: 'Documents',
                    modified: now,
                    size: 0,
                    children: [
                        { type: 'file', name: 'File1.txt', modified: now, size: 10 },
                        { type: 'file', name: 'File2.txt', modified: now, size: 20 },
                        {
                            type: 'folder',
                            name: 'Projects',
                            modified: now,
                            size: 0,
                            children: [
                                { type: 'file', name: 'File5.txt', modified: now, size: 10 },
                                { type: 'file', name: 'File6.txt', modified: now, size: 20 },
                                {
                                    type: 'folder',
                                    name: 'Projects-nested',
                                    modified: now,
                                    size: 0,
                                    children: [
                                        { type: 'file', name: 'File7.txt', modified: now, size: 10 },
                                        { type: 'file', name: 'File8.txt', modified: now, size: 20 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'folder',
                    name: 'Downloads',
                    modified: now,
                    size: 0,
                    children: [
                        { type: 'file', name: 'File3.txt', modified: now, size: 30 },
                        {
                            type: 'folder',
                            name: 'texts',
                            modified: now,
                            size: 0,
                            children: [
                                { type: 'file', name: 'File9.txt', modified: now, size: 10 },
                                { type: 'file', name: 'File10.txt', modified: now, size: 20 }
                            ]
                        }
                    ]
                },
                {
                    type: 'folder',
                    name: 'Images',
                    modified: now,
                    size: 0,
                    children: [
                        { type: 'file', name: 'Image1.png', modified: now, size: 45 }
                    ]
                }
            ]
        }
    ];

    return {
        statusCode: 200,
        body: JSON.stringify(fileStructure),
    };
};
