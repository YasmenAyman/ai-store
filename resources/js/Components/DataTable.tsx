import React from 'react';

export default function DataTable({ columns, data, actions }) {
    return (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted border-b border-border">
                            {columns.map((column) => (
                                <th key={column.key} className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {column.label}
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((item, index) => (
                            <tr key={item.id || index} className="hover:bg-muted/50 transition-colors">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 text-sm text-foreground">
                                        {column.render ? column.render(item[column.key], item) : item[column.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {actions(item)}
                                    </td>
                                )}
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-muted-foreground italic">
                                    No data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
