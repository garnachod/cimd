
def constant(f):
    def fset(self, value):
        raise TypeError
    def fget(self):
        return f()
    return property(fget, fset)

class Const(object):

    @constant
    def GOOGLE_MAPS_API_URL():
        return 'https://maps.googleapis.com/maps/api/'