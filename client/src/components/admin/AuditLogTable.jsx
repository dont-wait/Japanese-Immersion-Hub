/**
 * Bảng Audit Log cho quản trị viên
 */
export default function AuditLogTable({ logs = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-[#262640]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Time</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">User</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Action</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {logs.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                No audit logs found
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-50 dark:hover:bg-[#262640] transition-colors"
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium">{log.username}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 truncate max-w-xs">{log.details}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
