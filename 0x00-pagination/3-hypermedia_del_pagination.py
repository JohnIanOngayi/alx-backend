#!/usr/bin/env python3

"""
Page numbers are 1-indexed, i.e. the first page is page 1.
"""

from typing import Any, Tuple, Dict, List, Optional, Union
import csv


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0"""
        if self.__indexed_dataset is None:
            dset = self.dataset()
            truncated_dataset = dset[:1000]
            self.__indexed_dataset = {i: dset[i] for i in range(len(dset))}
        return self.__indexed_dataset

    def get_hyper_index(
        self, index: Optional[int] = None, page_size: Optional[int] = 10
    ) -> Dict:
        """
        Returns a dictionary with indexed key, value pairs

        Parameters:
            index (int): current start index of the return page
            page_size (int): size of page required

        Returns:
            Dict: Dict with pagination info
        """
        if index is None:
            index = 0

        assert isinstance(index, int)
        assert 0 <= index < len(self.indexed_dataset())
        assert isinstance(page_size, int) and page_size > 0

        data = []
        next_index = index + page_size

        for i in range(index, next_index):
            if self.indexed_dataset().get(i):
                data.append(self.indexed_dataset()[i])
            else:
                i += 1
                next_index += 1

        return {
            "index": index,
            "data": data,
            "page_size": page_size,
            "next_index": next_index,
        }

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Returns a dictionary with pagination info

        Parameters:
            page (int): Page number
            page_size (int): Size of each paginated page

        Returns:
            Dict[str, Any]: Dict with pagination info
        """
        inf: Dict[str, Any] = {}
        inf["data"] = self.get_page(page, page_size)
        dset = self.dataset()
        inf["page"] = page
        inf["page_size"] = page_size if page_size < len(dset) else len(dset)
        inf["next_page"] = page + 1 if page <= len(dset) // page_size else None
        inf["prev_page"] = page - 1 if page > 1 else None
        inf["total_pages"] = len(dset) // page_size
        return inf

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Function returns given page of data of size page_size

        Parameters:
            page (int): Page number
            page_size (int): Size of each paginated page

        Returns:
            List[List]: returns list of lists, each nested list is a line
                        from page
        """
        # Check validity of passed arguments
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0

        # Fetch all lines first (optimisation)
        dataset = self.dataset()
        # Get start and end indexes
        start_idx, end_idx = self.index_range(page, page_size)
        result = []
        if start_idx < len(dataset) and start_idx < len(dataset):
            for line in range(start_idx, end_idx):
                result.append(list(dataset[line]))
        return result

    @staticmethod
    def index_range(page: int, page_size: int) -> Tuple[int, int]:
        """
        Function caculates start and end indexes for pagination

        Parameters:
            page (int): Page number
            page_size (int): Size of each paginated page

        Returns:
            Tuple[int, int]: tuple containing start n end indx's for pagination
        """
        # Start index for pagination
        start_idx = (page - 1) * page_size

        # End index for pagination
        end_idx = page * page_size

        return start_idx, end_idx
