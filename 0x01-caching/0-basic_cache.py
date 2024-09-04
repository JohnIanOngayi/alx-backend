#!/usr/bin/env python3
"""
Module defines a class BasicCache that inherits from BaseCaching and
is a caching system
"""

from typing import Any
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    inherits from BaseCaching and is a caching system
    """

    def put(self, key: str, item: Any) -> None:
        """Assigns to the dictionary self.cache_data the item
        value for the key key"""
        if key and item:
            self.cache_data[key] = item

    def get(self, key: str) -> Any:
        """returns the value in self.cache_data linked to key"""
        return self.cache_data.get(key)
