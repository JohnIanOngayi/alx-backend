#!/usr/bin/env python3

"""
Write a function named index_range that takes two integer arguments page and
    page_size.

The function should return a tuple of size two containing a start index and an
    end index corresponding to the range of indexes to return in a list for
    those particular pagination parameters.

Page numbers are 1-indexed, i.e. the first page is page 1.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Function caculates start and end indexes for pagination

    Parameters:
        page (int): Page number
        page_size (int): Size of each paginated page

    Returns:
        Tuple[int, int]: tuple containing start and end indexes for pagination
    """
    # Start index for pagination
    start_idx = (page - 1) * page_size

    # End index for pagination
    end_idx = page * page_size

    return start_idx, end_idx
