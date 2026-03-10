import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Call Next.js proxy to return a borrowed book (loan).
 */
export async function returnLoan(loanId: number) {
  const response = await fetch(`/api/loans/${loanId}/return`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Failed to return book');
  }

  return json.data;
}

export function useReturnLoan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnLoan,
    onSuccess: () => {
      toast.success('Book returned successfully!');
      // Invalidate loan queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['my-loans'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error occurred while returning the book');
    },
  });
}
