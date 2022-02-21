from traffic.traffic import Traffic

class Aircraft:

    def __init__(self, traffic:Traffic, call_sign, aircraft_type, flight_phase, lat, long, alt, heading, cas, weight, fuel_weight, payload_weight):
        """
        Initialize one aircraft.

        Parameters
        ----------
        
        """
        self.traffic = traffic          # Pass traffic array reference
        self.index = self.traffic.add_aircraft(call_sign, aircraft_type, flight_phase, lat, long, alt, heading, cas, weight, fuel_weight, payload_weight)        # Add aircraft. Obtain aircraft index

    def get_heading(self):
        pass

    def get_cas(self):
        pass

    def get_vs(self):
        pass

    def get_alt(self):
        pass

    def get_long(self):
        pass

    def get_lat(self):
        pass

    def set_heading(self, heading):
        """Set heading [deg]"""
        self.traffic.ap.heading[self.index] = heading

    def set_speed(self, speed):
        """Set CAS [kt]"""
        self.traffic.ap.cas[self.index] = speed

    def set_vs(self, vs):
        """Set vs [ft/min]"""
        self.traffic.ap.vs[self.index] = vs

    def set_alt(self, alt):
        """Set alt [ft]"""
        self.traffic.ap.alt[self.index] = alt

    def set_direct(self, waypoint):
        pass

    def resume_own_navigation(self):
        pass




    
