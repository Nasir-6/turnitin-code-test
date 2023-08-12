package integrations.turnitin.com.membersearcher.service;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import integrations.turnitin.com.membersearcher.client.MembershipBackendClient;
import integrations.turnitin.com.membersearcher.model.MembershipList;

import integrations.turnitin.com.membersearcher.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MembershipService {
	@Autowired
	private MembershipBackendClient membershipBackendClient;

	/**
	 * Method to fetch all memberships with their associated user details included.
	 * This method calls out to the php-backend service and fetches all users,
	 * it then creates a userMap with the key being the userID,
	 * it then calls out to the php-backend service again and fetches all the members,
	 * lastly it associates the User with their corresponding membership.
	 *
	 * @return A CompletableFuture containing a fully populated MembershipList object.
	 */
	public CompletableFuture<MembershipList> fetchAllMembershipsWithUsers() {
		return membershipBackendClient.fetchUsers()
				.thenCompose(users -> {
					Map<String, User> userMap = users.getUsers().stream()
							.collect(Collectors.toMap(User::getId, user -> user));

					return membershipBackendClient.fetchMemberships()
							.thenApply(members -> {
								members.getMemberships()
										.forEach(member ->  member.setUser(userMap.get(member.getUserId())));
								return members;
							});
				});
	}
}
