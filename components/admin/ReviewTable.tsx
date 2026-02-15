interface Review {
  _id: string
  rating: number
  comment: string
  isApproved: boolean
}

interface Props {
  reviews: Review[]
}

export const ReviewTable = ({ reviews }: Props) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left">
          <th className="p-3">Rating</th>
          <th className="p-3">Comment</th>
          <th className="p-3">Approved</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((r) => (
          <tr key={r._id} className="border-b">
            <td className="p-3">{"★".repeat(r.rating)}</td>
            <td className="p-3">{r.comment}</td>
            <td className="p-3">
              {r.isApproved ? "Yes" : "No"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
