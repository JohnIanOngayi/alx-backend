#!/usr/bin/env python3

"""
Module defines a class MRUCache that inherits from BaseCaching and
is a caching system
"""

from typing import Any, Union
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    inherits from BaseCaching and is MRU a caching system
    """

    def __init__(self) -> None:
        """Initialises an MRUCache object"""
        super().__init__()
        self.recency_bit: list[str] = []

    def put(self, key: str, item: Any) -> None:
        """assigns to self.cache_data the item value for the key key"""
        if key and item:
            if len(self.cache_data.keys()) < self.MAX_ITEMS:
                self.cache_data[key] = item
                self.recency_bit.append(key)
            else:
                if key in self.cache_data.keys():
                    self.cache_data[key] = item
                    self.recency_bit.remove(key)
                    self.recency_bit.append(key)
                else:
                    discarded_key = self.recency_bit.pop()
                    del self.cache_data[discarded_key]
                    print(f"DISCARD: {discarded_key}")
                    self.cache_data[key] = item
                    self.recency_bit.append(key)

    def get(self, key: str) -> Any:
        """returns the value in self.cache_data linked to key"""
        value: Union[Any, None] = self.cache_data.get(key)
        if value:
            self.recency_bit.remove(key)
            self.recency_bit.append(key)
        return value
