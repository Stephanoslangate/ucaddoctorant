package data.sn.backcollecte.services;

import data.sn.backcollecte.config.JwtService;
import data.sn.backcollecte.dto.AuthRequest;
import data.sn.backcollecte.dto.AuthResponse;
import data.sn.backcollecte.entities.User;
import data.sn.backcollecte.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
@AllArgsConstructor
@Service
public class UserService  implements UserDetailsService {
    @Autowired
    public final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword1())) {
            throw new BadCredentialsException("Invalid password");
        }
        user.setUsername(user.getEmail());
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .build();
    }
    public User register(User user) {
        user.setPassword1(passwordEncoder.encode(user.getPassword1()));
        return userRepository.save(user);
    }
    public List<User> getAll(){
        return userRepository.findAll();
    }
    public User createUser(User user){
        return userRepository.save(user);
    }
    public User updateUser(Integer id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirst_name(userDetails.getFirst_name());
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        if (userDetails.getPassword1() != null && !userDetails.getPassword1().isEmpty()) {
            user.setPassword1(passwordEncoder.encode(userDetails.getPassword1()));
        }

        return userRepository.save(user);
    }
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public void deleteUser(int id){
        userRepository.deleteById(id);
    }


}
